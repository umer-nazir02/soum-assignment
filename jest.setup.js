// import 'whatwg-fetch';
import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
