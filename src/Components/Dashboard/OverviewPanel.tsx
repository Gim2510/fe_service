import {DetailItem} from "./DetailItem.tsx";

export function OverviewPanel({ users, surveys }: any) {
    return (
        <div className="space-y-12">

            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                <h2 className="text-2xl mb-6">User Distribution</h2>

                <div className="grid grid-cols-2 gap-6">
                    <DetailItem label="Admin" value={users?.usersByRole.admin} />
                    <DetailItem label="User" value={users?.usersByRole.user} />
                    <DetailItem label="Verified" value={users?.verifiedEmails} />
                    <DetailItem label="Unverified" value={users?.unverifiedEmails} />
                </div>
            </div>

            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-8 backdrop-blur">
                <h2 className="text-2xl mb-6">Survey Trend</h2>

                {surveys?.responsesByMonth.map((item: any) => (
                    <div
                        key={item.month}
                        className="flex justify-between border-b border-neutral-700 pb-2"
                    >
                        <span>{item.month}</span>
                        <span>{item.count}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}