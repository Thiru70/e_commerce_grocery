const AuditReport = ({ logs }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Audit Log

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Admin</th>

                        <th>Action</th>

                        <th>Description</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {logs.map(log => (

                        <tr key={log._id}>

                            <td>

                                {log.adminId?.name}

                            </td>

                            <td>

                                {log.action}

                            </td>

                            <td>

                                {log.description}

                            </td>

                            <td>

                                {new Date(
                                    log.createdAt
                                ).toLocaleString()}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default AuditReport;