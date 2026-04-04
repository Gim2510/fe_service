export function SurveySection({ surveys, theme }: any) {
    const isDark = theme === "dark";

    return (
        <div className={`p-6 rounded-2xl border backdrop-blur-xl
            ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-gray-200"}`}
        >
            <div className="mb-4 text-sm opacity-70">
                Survey Performance
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

                <div>
                    <div className="opacity-60">Total</div>
                    <div className="text-lg font-semibold">{surveys.totalResponses}</div>
                </div>

                <div>
                    <div className="opacity-60">Published</div>
                    <div className="text-lg font-semibold">{surveys.publishedResponses}</div>
                </div>

                <div>
                    <div className="opacity-60">Avg Score</div>
                    <div className="text-lg font-semibold">
                        {surveys.averageScore?.toFixed(2)}
                    </div>
                </div>

            </div>
        </div>
    );
}