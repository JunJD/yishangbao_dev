import React, { Suspense } from "react";
import Loading from "@src/component/Loading";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense
			fallback={
				// <div style={{}} >
					<Loading/>
				// </div>
			}
		>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
