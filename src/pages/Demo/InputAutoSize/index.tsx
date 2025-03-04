import React, { useState } from "react";
import AutosizeInput from "react-input-autosize";

const InputAutoSize: React.FC = () => {
    const [value, setValue] = useState<string>();

    return (
        <div>
            <AutosizeInput
                autoFocus
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                minWidth={200}
                style={{ background: "#eee", borderRadius: 5, padding: 5 }}
                inputStyle={{ border: "1px solid #999", borderRadius: 3, padding: 3, fontSize: 14 }}
            />
        </div>
    );
};

export default InputAutoSize;
