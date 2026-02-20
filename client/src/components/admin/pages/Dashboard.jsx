const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Welcome</h2>
                    <p className="text-gray-600">to the Shikoy Pharma Admin Portal.</p>
                </div>
                {/* Add stats cards here later */}
            </div>
        </div>
    );
};

export default Dashboard;
