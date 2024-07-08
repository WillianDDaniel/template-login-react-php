import Loading from "../Loading/Index";

export default function ConfirmCode({ email, confirmedCodeLoading }) {

    /**
     * The function `handleKeyDown` prevents input in a text field if the length reaches 6 characters
     * and the input is not Backspace, Delete, or a paste action.
     * @returns The function `handleKeyDown` returns `true` if the condition `e.target.value.length ===
     * 6 && !keys` is not met, otherwise it returns `false`.
     */
    const handleKeyDown = (e) => {
        const isCtrlV = (e.ctrlKey || e.metaKey) && e.key === 'v';
        const keys = e.key === 'Backspace' || e.key === 'Delete' || isCtrlV;

        if (e.target.value.length === 6 && !keys) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Loading
                loading={confirmedCodeLoading}
                title={'Redirecionando...'}
                message={'Código confirmado com sucesso!'}
            />
            
            <div className="flex flex-col items-center">

                <div className="flex flex-col items-center p-1">
                    <p>Enviamos um código de confirmação para o email</p>
                    <p>{email}</p>
                </div>

                <label htmlFor=""
                    className="p-2"
                >
                    Digite o código com 6 digitos
                </label>

                <input type="number" name="code" onKeyDown={handleKeyDown}
                    role="code"
                    className={`input-custom-code text-lg text-center p-1 w-28
                        outline-none rounded tracking-[0.25rem]
                    `}
                />
            </div>

        </>
    )
}