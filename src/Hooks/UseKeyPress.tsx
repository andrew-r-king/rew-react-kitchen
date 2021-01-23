import { useEffect } from "react";

const useKeyUp = (handler: (ev: KeyboardEvent) => void) => {
	useEffect(() => {
		document.addEventListener("keyup", handler);

		return () => {
			document.removeEventListener("keyup", handler);
		};
	}, [handler]);
};

const useKeyDown = (handler: (ev: KeyboardEvent) => void) => {
	useEffect(() => {
		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, [handler]);
};

export { useKeyUp, useKeyDown };
