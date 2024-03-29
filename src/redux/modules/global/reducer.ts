
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
}
/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	// language: string;
	// themeConfig: ThemeConfigProp;
}
const globalState: GlobalState = {
	token: "",
	userInfo: "",
	// assemblySize: "middle",
	// language: "",
	// themeConfig: {
	// 	primary: "#1890ff",
	// 	isDark: false,
	// 	weakOrGray: ""
	// }
};

const globalSlice = createSlice({
	name: "global",
	initialState: globalState,
	reducers: {
		setToken(state: GlobalState, { payload }: PayloadAction<string>) {
			state.token = payload;
		}
		// setAssemblySize(state: GlobalState, { payload }: PayloadAction<SizeType>) {
		// 	state.assemblySize = payload;
		// },
		// setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
		// 	state.language = payload;
		// },
		// setDark(state: GlobalState, { payload }: PayloadAction<boolean>) {
		// 	state.themeConfig.isDark = payload;
		// },
		// setWeakOrGray(state: GlobalState, { payload }: PayloadAction<string>) {
		// 	state.themeConfig.weakOrGray = payload;
		// }
	}
});

export const { setToken, /*setAssemblySize, setLanguage, setDark, setWeakOrGray*/ } = globalSlice.actions;
export default globalSlice.reducer;