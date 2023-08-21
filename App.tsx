// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, {useCallback, useEffect, useState} from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import WeatherWidget from './components/WeatherWidget';
// import {theme} from './theme';
// import {debounce} from 'lodash';

// import {
//   CalendarDaysIcon,
//   MagnifyingGlassIcon,
// } from 'react-native-heroicons/outline';
// import {MapPinIcon} from 'react-native-heroicons/solid';
// import {fetchLocations, fetchWeatherForecast} from './api/weather';
// import {getData, storeData} from './utils/asyncStorage';
// import {weatherImages} from './constants';
// // import process from 'tailwindcss/lib';

// // process(styles)
// //   .then(() => {
// //     // Render your components after tailwindcss plugins have been processed
// //     ReactDOM.render(<HomeScreen />, document.getElementById('root'));
// //   })
// //   .catch((error) => {
// //     console.error(error);
// //   });

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View className="bg-black flex-1" style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const [showSearch, toggleSearch] = useState(false);
//   const [locations, setLocations] = useState<
//     {name?: string; country?: string}[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [weather, setWeather] = useState<{
//     location?: {
//       country?: string;
//       name?: string;
//     };
//     current?: {
//       wind_kph?: string;
//       humidity?: string;
//       temp_c?: string;
//       condition?: {
//         text?: string;
//       };
//     };
//     forcast?: {
//       forcastday?: {day?: {condition?: {text?: string}}}[];
//     };
//   }>({});
//   const handleLocation = (loc: any) => {
//     setLoading(true);
//     toggleSearch(false);
//     setLocations([]);
//     fetchWeatherForecast({
//       cityName: loc.name,
//       days: '7',
//     }).then(data => {
//       setLoading(false);
//       setWeather(data);
//       storeData('city', loc.name);
//     });
//   };
//   const handleSearch = (value: string) => {
//     console.log('value', value);
//     if (value.length > 2) {
//       const res = fetchLocations({cityName: value});
//       console.log(res, 'response');
//     }
//   };
//   const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

//   const handleRefresh = () => {
//     // Simulate data refresh with new weather information
//     const updatedWeatherData = {
//       cityName: 'New City',
//       currentWeather: 'Rainy',
//       currentTemperature: 18,
//     };
//   };

//   useEffect(() => {
//     fetchMyWeatherData();
//   }, []);

//   const fetchMyWeatherData = async () => {
//     let myCity = await getData('city');
//     let cityName = 'Islamabad';
//     if (myCity) {
//       cityName = myCity;
//     }
//     fetchWeatherForecast({
//       cityName,
//       days: '7',
//     }).then(data => {
//       // console.log('got data: ',data.forecast.forecastday);
//       setWeather(data);
//       setLoading(false);
//     });
//   };
//   const {location, current} = weather;

//   return (
//     <View className="relative flex-1">
//       <Image
//         blurRadius={5}
//         className="absolute h-full w-full"
//         source={require('./assets/img/im1.jpg')}
//       />

//       <SafeAreaView className="flex flex-1">
//         {/* Search Section */}
//         <View style={{height: '7%'}} className="mx-4 mt-4 relative z-50">
//           <View
//             className="flex-row   rounded-full justify-end items-center "
//             style={{
//               backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
//             }}>
//             {showSearch ? (
//               <TextInput
//                 onChangeText={handleTextDebounce}
//                 placeholder="Search city"
//                 placeholderTextColor={'lightgray'}
//                 className="px-6 flex-1 h-10 text-base text-white"
//               />
//             ) : null}
//             <TouchableOpacity
//               onPress={() => toggleSearch(!showSearch)}
//               className="rounded-full p-3 m-1"
//               style={{backgroundColor: theme.bgWhite(0.3)}}>
//               <MagnifyingGlassIcon size={24} color="white" />
//             </TouchableOpacity>
//           </View>

//           {/* {locations.length > 0 && showSearch ? (
//             <View className="absolute w-full bg-gray-300 z-50  top-16 rounded-3xl">
//               {locations.map((v, i) => {
//                 let showBorder = i + 1 != locations.length;
//                 let borderClass = showBorder
//                   ? 'border-b-2 border-b-gray-400'
//                   : '';
//                 return (
//                   <TouchableOpacity
//                     key={i}
//                     className={
//                       'flex-row items-center border-0 p-3 px-4 mb-1 ' +
//                       borderClass
//                     }>
//                     <MapPinIcon size={20} color="gray" />
//                     <Text className="text-black text-lg ml-2 font-medium">
//                       London, United Kingdom
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           ) : null} */}

//           {locations.length > 0 && showSearch ? (
//             <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
//               {locations.map((loc, index) => {
//                 let showBorder = index + 1 != locations.length;
//                 let borderClass = showBorder
//                   ? ' border-b-2 border-b-gray-400'
//                   : '';
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => handleLocation(loc)}
//                     className={
//                       'flex-row items-center border-0 p-3 px-4 mb-1 ' +
//                       borderClass
//                     }>
//                     <MapPinIcon size="20" color="gray" />
//                     <Text className="text-black text-lg ml-2">
//                       {loc?.name}, {loc?.country}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           ) : null}
//         </View>
//         {/* Forcast section */}
//         <View className="mx-4 flex justify-around flex-1 mb-2">
//           {/* location */}
//           <Text className="text-white text-center text-2xl font-bold">
//             {location?.name},
//             <Text className="font-semibold text-gray-300 text-lg">
//               {location?.country}
//             </Text>
//           </Text>
//           {/* weather image */}
//           <View className="flex-row justify-center">
//             <Image
//               style={{zIndex: 1}}
//               source={weatherImages[current?.condition?.text || 'other']}
//               className="w-52 h-52   block"
//             />
//           </View>
//           {/* Degree celcius */}
//           <View className="space-y-2">
//             <Text className="text-center font-bold text-white text-6xl ml-5">
//               {current?.temp_c}&#176;
//             </Text>
//             <Text className="text-center font-bold text-white text-xl ml-5 tracking-widest">
//               {current?.condition?.text}
//             </Text>
//           </View>
//           {/* Other stats */}
//           <View className="flex-row justify-between mx-4">
//             <View className="flex-row space-x-2 items-center">
//               <Image
//                 source={require('./assets/icons/wind.png')}
//                 className="w-4 h-4"
//               />
//               <Text className="text-white font-semibold text-base">
//                 {current?.wind_kph}km
//               </Text>
//             </View>
//             <View className="flex-row space-x-2 items-center">
//               <Image
//                 source={require('./assets/icons/drop.png')}
//                 className="w-4 h-4"
//               />
//               <Text className="text-white font-semibold text-base">
//                 {current?.humidity}%
//               </Text>
//             </View>
//             <View className="flex-row space-x-2 items-center">
//               <Image
//                 source={require('./assets/icons/sun.png')}
//                 className="w-4 h-4"
//               />
//               <Text className="text-white font-semibold text-base">22km</Text>
//             </View>
//           </View>

//           {/* Forcast for next days */}
//           <View className="mb-2 space-y-3">
//             <View className="flex-row items-center mx-5 space-x-2">
//               <CalendarDaysIcon size={22} color="white" />
//               <Text className="text-white text-base">Daily forecast</Text>
//             </View>
//             <ScrollView
//               className=""
//               horizontal
//               contentContainerStyle={{paddingHorizontal: 15}}
//               showsHorizontalScrollIndicator={false}>
//               {weather?.forcast?.forcastday?.map((v, i) => (
//                 <View
//                   key={i}
//                   className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 px-4 mr-4"
//                   style={{backgroundColor: theme.bgWhite(0.15)}}>
//                   <Image
//                     source={weatherImages[v?.day?.condition?.text || 'other']}
//                     className="h-11 w-11"
//                   />
//                   <Text className="text-white">Monday</Text>
//                   <Text className="text-white text-xl font-semibold">
//                     13&#176;
//                   </Text>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </SafeAreaView>
//       {/* <WeatherWidget
//         cityName={weatherData.cityName}
//         currentWeather={weatherData.currentWeather}
//         currentTemperature={weatherData.currentTemperature}
//         onRefresh={handleRefresh}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  RefreshControl,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from './theme';
import {fetchLocations, fetchWeatherForecast} from './api/weather';
import * as Progress from 'react-native-progress';
// import { StatusBar } from 'expo-status-bar';
import {weatherImages} from './constants';
import {getData, storeData} from './utils/asyncStorage';
import MainWeatherWidget from './components/MainWeatherWidget';

export default function App() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState<
    {name?: string; country?: string}[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<{
    location?: {
      country?: string;
      name?: string;
    };
    current?: {
      wind_kph?: string;
      humidity?: string;
      temp_c?: string;
      condition?: {
        text?: string;
      };
    };
    forecast?: {
      forecastday?: {
        day?: {condition?: {text?: string}; avgtemp_c?: string};
        astro: {sunrise?: string};
      }[];
    };
  }>({});

  const handleSearch = (search: any) => {
    // console.log('value: ',search);
    if (search && search.length > 2)
      fetchLocations({cityName: search}).then(data => {
        // console.log('got locations: ',data);
        setLocations(data);
      });
  };

  const handleLocation = (loc: {name: string}) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Bhopal';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    });
  };
  1;

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  return (
    <View className="flex-1 relative">
      {/* <StatusBar style="light" /> */}
      <Image
        blurRadius={20}
        source={require('./assets/img/im1.jpg')}
        className="absolute w-full h-full "
      />
      <ScrollView className="flex-1">
        {loading ? (
          <View className="flex-1 flex-row justify-center items-center">
            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
          </View>
        ) : (
          <SafeAreaView className="flex flex-1">
            {/* search section */}
            <View
              style={{height: '7%', zIndex: 100}}
              className="mx-4 relative my-2 ">
              <View
                className="flex-row justify-end items-center rounded-full"
                style={{
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : 'transparent',
                }}>
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search city"
                    placeholderTextColor={'lightgray'}
                    className="px-6  h-10 flex-1 text-base text-white"
                  />
                ) : null}
                <TouchableOpacity
                  onPress={() => toggleSearch(!showSearch)}
                  className="rounded-full p-3 m-1"
                  style={{backgroundColor: theme.bgWhite(0.3)}}>
                  {showSearch ? (
                    <XMarkIcon size="25" color="white" />
                  ) : (
                    <MagnifyingGlassIcon size="25" color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {locations.length > 0 && showSearch ? (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                  {locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder
                      ? ' border-b-2 border-b-gray-400'
                      : '';
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleLocation(loc as any)}
                        className={
                          'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                          borderClass
                        }>
                        <MapPinIcon size="20" color="gray" />
                        <Text className="text-black text-lg ml-2">
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <MainWeatherWidget
              refreshing={loading}
              onRefresh={() => {
                console.log('data');

                fetchMyWeatherData();
              }}
              forecast={weather?.forecast?.forecastday?.at(0)?.astro?.sunrise}
              humidity={current?.humidity}
              windkph={current?.wind_kph}
              cityName={location?.name}
              countryName={location?.country}
              currentTemperature={current?.temp_c}
              currentWeather={current?.condition?.text}
              imgSource={weatherImages[current?.condition?.text ?? 'other']}
            />

            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday?.map((item: any, index) => {
                  const date = new Date(item.date);
                  const options = {weekday: 'long'} as Object;
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];

                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{backgroundColor: theme.bgWhite(0.15)}}>
                      <Image
                        // source={{uri: 'https:'+item?.day?.condition?.icon}}
                        source={
                          weatherImages[item?.day?.condition?.text || 'other']
                        }
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
}
