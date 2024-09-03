/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import style from './AppStyles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import stylesDark from './AppStylesDark';
import SoundPlayer from 'react-native-sound-player';
import musicData from './music';
import BackgroundTimer from 'react-native-background-timer';

function App(): React.JSX.Element {
  const [start, setStart] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [selectedTime, setSelectedTime] = useState('5');
  const [music, setMusic] = useState(musicData[0]['music']);
  const [selectedCatagory, setSelectedCategory] = useState(musicData[0]);
  const [currentMusic, setCurrentMusic] = useState(musicData[0].music[0]);

  const varr = [
    'Let the music heal your soul.',
    'Find peace in every sound.',
    'Melodies that soothe the mind.',
    'Relax, unwind, and breathe deeply.',
    'Calm your mind with gentle tunes.',
    'Embrace the silence between the notes.',
    'Sounds of tranquility for your soul.',
    'Let the music wash away your worries.',
    'Serenity is just a note away.',
    'Feel the rhythm of relaxation.',
  ];
  const randomNumber = Math.floor(Math.random() * varr.length);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleCategoryChange = (index: number) => {
    setSelectedCategory(musicData[index]);
    setMusic(musicData[index].music);
    setCurrentMusic(musicData[index].music[0]);
    setStart(!start);
  };

  const handleBack = () => {
    setStart(!start);
    setIndex(0);
  };

  useEffect(() => {
    if (countdown > 0) {
      BackgroundTimer.runBackgroundTimer(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            BackgroundTimer.stopBackgroundTimer();
            return 0;
          }
        });
      }, 1000);
    } else if (countdown === 0) {
      setPlay(prevPlay => {
        if (prevPlay) {
          return !prevPlay;
        }
        return prevPlay;
      });
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [countdown, selectedTime]);

  useEffect(() => {
    if (play && !start) {
      try {
        SoundPlayer.playUrl(currentMusic.url);
        SoundPlayer.addEventListener('FinishedPlaying', handleNext);
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    } else {
      SoundPlayer.pause();
    }
  }, [start, play, index, selectedCatagory]);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleNext = () => {
    SoundPlayer.stop();
    if (index < music.length - 1) {
      setIndex(prevIndex => +prevIndex + 1);
      setCurrentMusic(music[index + 1]);
      if (!play) {
        setPlay(!play);
      }
    } else {
      setIndex(0);
      setCurrentMusic(music[0]);
    }
  };

  const handlePrev = () => {
    SoundPlayer.stop();
    if (index > 0) {
      setIndex(prevIndex => +prevIndex - 1);
      setCurrentMusic(music[index - 1]);
      if (!play) {
        setPlay(!play);
      }
    } else {
      setIndex(music.length - 1);
      setCurrentMusic(music[music.length - 1]);
    }
  };

  const handleTimer = () => {
    setCountdown(+selectedTime * 60);
    if (!play) {
      setPlay(!play);
    }
  };

  const handleTimeChange = (event: string | number) => {
    setSelectedTime(event as string);
  };

  return (
    <SafeAreaView style={[stylesDark(isDarkMode).container, backgroundStyle]}>
      {start ? (
        <ScrollView style={style.scrollContainer}>
          <View style={style.formCatagorySection}>
            <Text style={style.appTitleMain}>Relaxing Music</Text>
            <Text style={style.quote}>{varr[randomNumber]}</Text>
            <View style={style.menuContainer}>
              {musicData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={style.menu}
                  onPress={() => handleCategoryChange(index)}>
                  <ImageBackground
                    source={{
                      uri: `${item.image}`,
                    }}
                    style={style.image}
                    resizeMode="cover"
                    alt={item.altText}>
                    <Text style={stylesDark(isDarkMode).menuText}>
                      {item.title}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={style.scrollContainer}>
          <View style={style.appTitleContainer}>
            <Icon name="arrow-left" size={20} onPress={handleBack} />
            <Text style={style.appTitle}>{selectedCatagory.title}</Text>
          </View>
          <View style={style.albumContainer}>
            <Image
              source={{
                uri: `${selectedCatagory.image}`,
              }}
              style={style.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={style.audioTitle}>
              {`${index + 1}. `}
              {currentMusic.title}
            </Text>
          </View>
          <View style={style.musicControllerContainer}>
            <Icon name="step-backward" size={48} onPress={handlePrev} />
            {!play ? (
              <Icon name="play" size={48} onPress={handlePlayPause} />
            ) : (
              <Icon name="pause" size={48} onPress={handlePlayPause} />
            )}
            <Icon name="step-forward" size={48} onPress={handleNext} />
          </View>
          <View style={style.timerContainer}>
            <View style={style.formSection}>
              <Picker
                selectedValue={selectedTime.toString()}
                onValueChange={handleTimeChange}
                style={style.picker}>
                <Picker.Item label="5 mins" value="5" />
                <Picker.Item label="10 mins" value="10" />
                <Picker.Item label="15 mins" value="15" />
                <Picker.Item label="20 mins" value="20" />
                <Picker.Item label="25 mins" value="25" />
                <Picker.Item label="30 mins" value="30" />
                <Picker.Item label="35 mins" value="35" />
                <Picker.Item label="40 mins" value="40" />
              </Picker>

              <TouchableOpacity
                style={stylesDark(isDarkMode).timerButton}
                onPress={handleTimer}>
                <Text style={stylesDark(isDarkMode).timerButtonText}>
                  SET TIMER
                </Text>
              </TouchableOpacity>
            </View>

            {countdown !== 0 && (
              <View style={style.timeCountdown}>
                <Text style={style.timeText}>
                  Time left:{' '}
                  {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                  {String(countdown % 60).padStart(2, '0')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default App;
