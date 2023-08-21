import React, {useState, useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  GestureResponderEvent,
  Image,
  RefreshControl,
} from 'react-native';
type Props = {
  forecast?: string;
  humidity?: string;
  windkph?: string;
  imgSource?: any;
  cityName?: string;
  countryName?: string;
  currentWeather?: string;
  currentTemperature?: string;
  onRefresh?: () => void;
  refreshing: boolean;
};
const MainWeatherWidget: FC<Props> = ({
  refreshing,
  humidity,
  forecast,
  windkph,
  imgSource,
  cityName,
  countryName,
  currentWeather,
  currentTemperature,
  onRefresh,
}) => {
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    // Trigger animation whenever weather changes
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentWeather]);

  const interpolateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const animatedStyles = {
    opacity: interpolateAnimation,
  };

  return (
    <RefreshControl
      onRefresh={onRefresh}
      refreshing={refreshing}
      className=" flex-1">
      <View className="mx-4 flex justify-around flex-1 my-8">
        {/* location */}
        <Text className="text-white text-center text-2xl font-bold">
          {cityName},
          <Text className="text-lg font-semibold text-gray-300">
            {countryName}
          </Text>
        </Text>
        {/* weather icon */}
        <View className="flex-row justify-center relative ">
          <Animated.Image
            style={animatedStyles}
            // source={{uri: 'https:'+current?.condition?.icon}}
            source={imgSource}
            className="w-52 h-52 -z-50"
          />
        </View>
        {/* degree celcius */}
        <View className="space-y-2 my-8">
          <Text className="text-center font-bold text-white text-6xl ml-5">
            {currentTemperature}&#176;C
          </Text>
          <Text className="text-center text-white text-xl tracking-widest">
            {currentWeather}
          </Text>
        </View>

        {/* other stats */}
        <View className="flex-row justify-between mx-4 mt-2">
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require('../assets/icons/wind.png')}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">
              {windkph}km
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require('../assets/icons/drop.png')}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">
              {humidity}%
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require('../assets/icons/sun.png')}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">
              {forecast}
            </Text>
          </View>
        </View>

        {/* <Text>Pull to refresh</Text> */}
      </View>
    </RefreshControl>
  );
};

export default MainWeatherWidget;
