export default function Footer() {
    return (
        <footer 
            className={`
                w-full flex justify-end min-[640px]:pr-10 items-center 
                h-12 bg-zinc-900 text-white mt-auto
                text-sm max-[640px]:justify-center max-[380px]:p-3 max-[380px]:h-auto
            `}
        >
            <div className="max-[360px]:w-full text-center">
                Desenvolvido com ❤️ por

                <strong className="ml-2">
                    Willian D. Daniel
                </strong>
            </div>

        </footer>
    )
}