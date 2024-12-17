export const DataPointCount = ({ count, colors }: { count: number, colors: string[] }) => {

    const getMargin = (index: number) => {
        if (index === 0) return '-ml-4';
        if (index === 1) return '-ml-3.5';
        if (index === 2) return '-ml-3.5';
        if (index === 3) return '-ml-3.5';
        if (index === 4) return '-ml-4';
        return '';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-row">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`flex w-6 h-6 rounded-full border border-neutral-950 ${getMargin(index)}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-white text-lg">{count}</span>
      </div>
    );
  };