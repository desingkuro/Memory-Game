import Button from "../../../shared/components/button";

export default function FooterHome(){
    return(
        <footer className="w-full h-[140px] flex items-center justify-center ">
            <div className=" w-[240px] ">
                <Button type="button" size="lg" variant="primary" tone={100}>
                    Jugar
                </Button>
            </div>
        </footer>
    );
}