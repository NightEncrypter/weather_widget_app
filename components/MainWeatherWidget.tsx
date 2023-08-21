import React, {useState, useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  GestureResponderEvent,
  Image,
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
  onRefresh?: (event: GestureResponderEvent) => void;
};
const MainWeatherWidget: FC<Props> = ({
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
      toValue: 1,
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
    <View className="mx-4 flex justify-around flex-1 mb-2">
      {/* location */}
      <Text className="text-white text-center text-2xl font-bold">
        {cityName},
        <Text className="text-lg font-semibold text-gray-300">
          {countryName}
        </Text>
      </Text>
      {/* weather icon */}
      <View className="flex-row justify-center">
        <Animated.Image
          // source={{uri: 'https:'+current?.condition?.icon}}
          source={imgSource}
          className="w-52 h-52"
        />
      </View>
      {/* degree celcius */}
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {currentTemperature}&#176;
        </Text>
        <Text className="text-center text-white text-xl tracking-widest">
          {currentWeather}
        </Text>
      </View>

      {/* other stats */}
      <View className="flex-row justify-between mx-4">
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
          <Text className="text-white font-semibold text-base">{forecast}</Text>
        </View>
      </View>
    </View>
  );
};

export default MainWeatherWidget;
