import type { ParamListBase } from '@react-navigation/native';
import {
  StackScreenProps,
  StackNavigationOptions,
} from '@react-navigation/stack';

export type Props = StackScreenProps<ParamListBase> & {
  options?: StackNavigationOptions;
};
