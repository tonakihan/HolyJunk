#!/bin/bash

# show-exports.sh - Analyze TypeScript exports in compact format
# Usage: ./show-exports.sh <path-to-ts-file>
# Output format: export: DefaultExport, { named, exports }, type { TypeExports }

# TODO: Add support of declare

set -euo pipefail

main() {
  if [ $# -ne 1 ]; then
    echo "Usage: $0 <typescript-file>" >&2
    exit 1
  fi

  local ts_file=$1
  validate_file "$ts_file"
  analyze_exports "$ts_file"
}

validate_file() {
  local file=$1
  if [ ! -f "$file" ]; then
    echo "Error: File not found: $file" >&2
    exit 1
  fi
}

analyze_exports() {
  local file=$1

  # Remove comments and normalize whitespace for parsing
  local cleaned
  cleaned=$(sed 's|//.*||g' "$file" | sed 's|/\*.*\*/||g')

  local default_export
  default_export=$(extract_default_export "$cleaned")

  local named_exports
  named_exports=$(extract_named_exports "$cleaned")

  local type_exports
  type_exports=$(extract_type_exports "$cleaned")

  build_output "$default_export" "$named_exports" "$type_exports"
}

extract_default_export() {
  local cleaned=$1
  local default_export=""

  if echo "$cleaned" | grep -q "export\s\+default"; then
    default_export=$(echo "$cleaned" | grep "export\s\+default" | \
      sed 's/export\s\+default\s\+//; s/[;,].*//' | \
      sed 's/^\s*//;s/\s*$//' | head -1)
  fi

  echo "$default_export"
}

extract_named_exports() {
  local cleaned=$1
  local named_exports=""

  # Match: export const/function/class/interface/enum NAME
  local named
  named=$(echo "$cleaned" | grep -oE "export\s+(const|let|var|function|class|interface|enum)\s+(\{[^}]*\}|[a-zA-Z_$][a-zA-Z0-9_$]*)" | \
    sed 's/export\s\+\(const\|let\|var\|function\|class\|interface\|enum\)\s\+//g' | \
    sed 's/\s*{.*//' | sort -u)

  # Handle destructuring exports: export const { x, y } = object
  local destructure
  destructure=$(echo "$cleaned" | grep -oE "export\s+const\s+\{[^}]+\}" | \
    sed 's/export\s\+const\s\+{//; s/}.*//' | \
    tr ',' '\n' | sed 's/^\s*//;s/\s*$//' | sort -u)

  if [ -n "$named" ] || [ -n "$destructure" ]; then
    named_exports=$(echo -e "$named\n$destructure" | grep -v "^$" | sort -u | tr '\n' ', ' | sed 's/,$//')
  fi

  echo "$named_exports"
}

extract_type_exports() {
  local cleaned=$1
  local type_exports=""

  # Match: export type NAME or export type { ... }
  local type_named
  type_named=$(echo "$cleaned" | grep -oE "export\s+type\s+(\{[^}]*\}|[a-zA-Z_$][a-zA-Z0-9_$]*)" | \
    sed 's/export\s\+type\s\+{//; s/export\s\+type\s\+//; s/}.*//' | sort -u)

  if [ -n "$type_named" ]; then
    type_exports=$(echo "$type_named" | grep -v "^$" | tr '\n' ', ' | sed 's/,$//')
  fi

  echo "$type_exports"
}

build_output() {
  local default_export=$1
  local named_exports=$2
  local type_exports=$3

  local output="export "

  if [ -n "$default_export" ]; then
    output+="$default_export"
  fi

  if [ -n "$named_exports" ]; then
    [ -n "$default_export" ] && output+=", "
    output+="{ $named_exports }"
  fi

  if [ -n "$type_exports" ]; then
    [ -n "$default_export" ] || [ -n "$named_exports" ] && output+=", "
    output+="type { $type_exports }"
  fi

  if [ "$output" = "export " ]; then
    echo "No exports found" >&2
    exit 1
  else
    echo "$output"
  fi
}

main "$@"
