export default function Input({ label, type, id, placeholder, propInput }: { label: string, type: string, id: string, placeholder: string, propInput: any }) {
    return (
        <div className="w-[80%] h-auto flex flex-col justify-center items-center gap-2 !py-2">
            <label htmlFor={id} className=" text-quinary text-xl text-left w-full font-semibold">{label}</label>
            <input 
            type={type} 
            id={id} 
            placeholder={placeholder} 
            className="h-[64px] w-[100%] font-medium !py-2 !px-4 rounded-[8px] border border-quinary border-2 outline-none" 
            {...propInput} />
        </div>
    );
}