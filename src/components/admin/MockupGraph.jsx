const MockupGraph = () => {
  return (
    <div className="flex w-full h-full flex-col gap-4 justify-center items-start p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-50 w-full"></div>
    </div>
  );
};
export default MockupGraph;
