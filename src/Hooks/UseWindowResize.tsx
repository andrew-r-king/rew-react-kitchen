import { useEffect } from "react";

const useWindowResize = (handler: (ev: UIEvent) => void) => {
	useEffect(() => {
		window.addEventListener("resize", handler);

		return () => {
			window.removeEventListener("resize", handler);
		};
	}, [handler]);
};

export { useWindowResize };
