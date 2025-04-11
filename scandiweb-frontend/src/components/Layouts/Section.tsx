export const Section: React.FC<{id: string, children: React.ReactNode}> = ({children}) => {
    return (
        <section className="mt-20 py-16">
            {children}
        </section>
    )
}