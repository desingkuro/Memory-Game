import Button from "../../../shared/components/button";

export default function FooterHome({ onClick, stateGame }: { onClick: () => void, stateGame: string }) {
    return (
        <footer className="w-full xl:h-[140px] h-[100px] flex items-center justify-center ">
            <div className=" w-[240px] ">
                {stateGame === "characters" && <Button type="button" size="lg" variant="primary" tone={100} onClick={onClick}>
                    Jugar
                </Button>}
            </div>
        </footer>
    );
}