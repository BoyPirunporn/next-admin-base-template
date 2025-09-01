
const loading = () => {
  return (
    <div className=' h-screen w-full pointer-events-auto  bg-accent/50 top-0 z-10 absolute'>
      <div className="h-full w-full flex justify-center items-center flex-col ">
        <div className='loader ' />
      </div>
    </div>
  );
};

export default loading;