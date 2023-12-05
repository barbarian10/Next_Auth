import React from "react"

type passValidation = {
    passRequirements: any[],
    isPassValid: boolean,
    showValidation: boolean
}

const PassValidationText = ({ passRequirements, isPassValid, showValidation }: passValidation) => {
    return (
         showValidation && !isPassValid ? (
            <p className="text-red-500 text-xs">
                {!passRequirements[0]
                    ?
                    "Password should contain at least 8 characters" :
                    !passRequirements[1] ?
                        "Password should contain less than 20 characters" :
                        !passRequirements[2] ?
                            "Password should contain at least 1 number"
                            : !passRequirements[3] ? "Password should contain at least 1 letter"
                                : ""}
            </p>
        ) : null
    )
}

export default PassValidationText;