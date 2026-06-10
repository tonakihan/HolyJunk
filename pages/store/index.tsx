import useBear from "@/store/useBear";
import { NextPage } from "next";

function BearCounter() {
  const bears = useBear((state) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}

function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

const State_test: NextPage = () => {
  return (
    <>
      {BearCounter()}
      {Controls()}
    </>
  );
};

export default State_test;
