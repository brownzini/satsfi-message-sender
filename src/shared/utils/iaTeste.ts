export default function iaTeste () {

    async function query(data:any) {
		const response = await fetch(
			"https://api-inference.huggingface.co/models/ylacombe/mms-spa-finetuned-chilean-monospeaker",
			{
				headers: { Authorization: "Bearer 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" },
				method: "POST",
				body: JSON.stringify(data),
			}
		);
			const result = await response.blob();
			return result;
		}
		query({"inputs": "Videos do carlinhos na internet"}).then((response) => {
			// Returns a byte object of the Audio wavform. Use it directly!
		});
}