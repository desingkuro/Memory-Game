import Button from "../../../shared/components/button";

export default function FooterHome({ onClick, stateGame }: { onClick: () => void, stateGame: string }) {
    return (
        <footer className="w-full h-[140px] flex items-center justify-center ">
            <div className=" w-[240px] ">
                {stateGame === "characters" && <Button type="button" size="lg" variant="primary" tone={100} onClick={onClick}>
                    Jugar
                </Button>}
            </div>
        </footer>
    );
}