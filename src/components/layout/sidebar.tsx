
const Sidebar = () => {
    return (
        <div className='w-full h-full bg-slate-700 flex flex-col gap-2 p-5'>
            <ul>
                <li className='text-white'>products</li>
                <li className='text-white'>inventory</li>
                <li className='text-white'>users</li>
                <li className='text-white'>orders</li>
                <li className='text-white'>logout</li>
                <li className='text-white'>profile</li>
            </ul>
        </div>
    );
}

export default Sidebar;
