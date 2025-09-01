
const Backdrop = () => {
    return (
        <div className=' h-screen w-full pointer-events-auto  bg-accent/50 top-0 z-10 fixed peer-data-[state=expanded]:max-w-[calc(100%_-_var(--sidebar-width))]'>
            <div className="h-full w-full flex justify-center items-center flex-col ">
                <div className='loader ' />
            </div>
        </div>
    );
};

export default Backdrop;