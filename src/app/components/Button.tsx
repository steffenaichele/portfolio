const Button = ({ text }: { text: string }) => {
	return (
		<button className=" h-10 px-4 py-2 bg-primary text-white rounded">
			{text}
		</button>
	);
};

export default Button;