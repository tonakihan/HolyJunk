#!/bin/bash

# show-doc.sh - Extract TypeDoc/JSDoc documentation for a component
# Usage: ./show-doc.sh <path-to-ts-file> <component-name>

set -euo pipefail

main() {
  if [ $# -ne 2 ]; then
    echo "Usage: $0 <typescript-file> <component-name>"
    exit 1
  fi

  local ts_file=$1
  local component=$2

  validate_file "$ts_file"
  extract_typedoc "$ts_file" "$component"
}

validate_file() {
  local file=$1
  if [ ! -f "$file" ]; then
    echo "Error: File not found: $file" >&2
    exit 1
  fi
}

extract_typedoc() {
  local file=$1
  local component=$2

  local in_doc_block=0
  local doc_block=""
  local found=0

  while IFS= read -r line; do
    # Check if we're starting a doc block
    if [[ $line =~ /\*\* ]]; then
      in_doc_block=1
      doc_block="$line"
      continue
    fi

    # While in doc block, collect lines
    if [ $in_doc_block -eq 1 ]; then
      doc_block+=$'\n'"$line"

      # Check if doc block ends
      if [[ $line =~ \*/ ]]; then
        in_doc_block=0
        continue
      fi
      continue
    fi

    # After doc block ends, check for component definition
    if [ $in_doc_block -eq 0 ] && [ -n "$doc_block" ] && \
       [[ $line =~ ^[[:space:]]*(export[[:space:]]+)?(async[[:space:]]+)?(function|class|const|interface|type)[[:space:]]+$component([^a-zA-Z0-9_]|$) ]]; then
      found=1

      # Clean and output the doc block
      echo "$doc_block" | \
        sed '1s|^[[:space:]]*/\*\*[[:space:]]*||' | \
        sed '$s|[[:space:]]*\*/[[:space:]]*$||' | \
        sed 's|^[[:space:]]*\*[[:space:]]\?||' | \
        sed -e '/^[[:space:]]*$/d'
      break
    fi

    # Reset if we encounter non-comment/non-empty line without match
    if [ -n "$line" ] && ! [[ $line =~ ^[[:space:]]*$ ]] && ! [[ $line =~ /\* ]]; then
      doc_block=""
    fi
  done < "$file"

  if [ $found -eq 0 ]; then
    echo "Not found" >&2
    return 1
  fi
}

main "$@"
