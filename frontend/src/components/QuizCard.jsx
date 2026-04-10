function QuizCard({
  question,
  options,
  selectedOption,
  correctOption,
  onSelect,
  explanation,
}) {
  const hasAnswered = Boolean(selectedOption);

  return (
    <div className="w-full flex justify-start animate-scale-in">
      <div className="w-full max-w-[95%] sm:max-w-[90%] rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm shadow-sm">
        <p className="font-medium text-slate-900 mb-2">{question}</p>
        <div className="flex flex-col gap-2">
          {options.map((opt, index) => {
            const value = opt.value ?? opt;
            const label = opt.label ?? opt;
            const isSelected = selectedOption === value;
            const isCorrect = correctOption === value;

            let optionClasses =
              "w-full text-left px-3 py-2 rounded-xl border text-sm transition-all duration-200";

            if (!hasAnswered) {
              optionClasses +=
                " border-slate-200 bg-white hover:bg-indigo-50 text-slate-800";
            } else if (isCorrect) {
              optionClasses +=
                " border-emerald-500 bg-emerald-50 text-emerald-800";
            } else if (isSelected && !isCorrect) {
              optionClasses += " border-rose-500 bg-rose-50 text-rose-800";
            } else {
              optionClasses +=
                " border-slate-200 bg-white text-slate-500 opacity-75";
            }

            return (
              <button
                key={index}
                type="button"
                disabled={hasAnswered}
                className={optionClasses}
                onClick={() => onSelect(value)}
              >
                <span className="font-medium mr-1">
                  {String.fromCharCode(65 + index)}.
                </span>
                {label}
              </button>
            );
          })}
        </div>
        {hasAnswered && correctOption && (
          <div className="mt-3 text-xs text-slate-600">
            <p className="font-medium text-emerald-700 mb-1">
              Correct answer:{" "}
              <span className="uppercase">{correctOption}</span>
            </p>
            {explanation && <p>{explanation}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizCard;

