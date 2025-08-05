
export interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  type: string;
}
export interface Category extends Models.Document {
  $id: string,
  name: string;
  description: string;
}
export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}
export interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}
export interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}
export interface CreateUserPrams {
  email: string;
  password: string;
  name: string;
}
export interface SignInParams {
  email: string;
  password: string;
}

export interface GetMenuParams {
  category: string;
  query: string;
}