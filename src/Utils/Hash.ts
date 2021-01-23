// https://stackoverflow.com/a/8831937

const hashString = (inString: string): number => {
	let hash: number = 0;

	if (inString.length === 0) {
		return hash;
	}

	for (let i = 0; i < inString.length; ++i) {
		let char = inString.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to a 32-bit integer
	}

	return hash;
};

export { hashString };
