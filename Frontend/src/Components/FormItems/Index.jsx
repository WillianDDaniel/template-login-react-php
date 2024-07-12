
export default function FormItems({ formContent, checkPassword }) {
    
    return (
        <>
            {
                formContent.map((item, i) => {
                    return (
                        <div key={i}
                            className={`flex flex-col px-2 py-1.5 text-sm
                            ${item.name === 'name' || item.name === 'lastName' ? 'w-10/12 sm:w-5/12' : 'w-10/12' }`}
                        >
                            <label className="pl-1" htmlFor={item.name}>
                                {item.label}
                            </label>

                            <input type={item.type} placeholder={item.placeHolder}
                                name={item.name} required id={item.name} role="input"
                                minLength={item.type === 'password' ? 8 : null}
                                onChange={item.type === 'password' ? checkPassword : null}
                                autoComplete={item.autoComplete && item.autoComplete}
                                className={` rounded px-1.5 py-[2.5px] outline-none`}
                            />
                        </div>
                    )
                })
            }
        </>

    )
}