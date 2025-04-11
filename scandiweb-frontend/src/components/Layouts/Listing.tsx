export const Listing: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-8">
            {children}
        </div>
    );
};
