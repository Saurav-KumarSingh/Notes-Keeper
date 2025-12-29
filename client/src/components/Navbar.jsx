
const Navbar = () => {
    return (
        <div>

            <div className="flex-1 flex flex-col">

                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-purple-700">Notes Keeper</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">SR</div>
                    </div>
                </header>
            </div>

        </div>
    )
}

export default Navbar