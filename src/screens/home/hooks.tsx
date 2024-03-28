import {useEffect, useRef, useState} from 'react';
import config from '../../config';
import fetch from '../../utils/request-handler';
import {debounce} from '../../utils/debounce';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, ToastAndroid} from 'react-native';

export const useHomeHook = () => {
  const [isLoading, setLoading] = useState(false);
  const [gifData, setGifData] = useState<any>(null);
  const [selectedGif, setSelectedGif] = useState<number | null>(null);
  const [searchText, setSearchedText] = useState('');
  const [theme, setTheme] = useState('light');
  const [extraDataLoading, setExtraDataLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadGifLink, setDownloadGifLink] = useState(null);

  const _onThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }
    setTheme('light');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(config.getTrendingApi.replace('{offset}', 0), {});
      setGifData(res || {});
      setLoading(false);
    } catch (e) {
      setGifData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const _onLoadMore = async () => {
    if (
      gifData?.data?.length > 0 &&
      gifData?.data?.length !== gifData?.pagination?.total_count
    ) {
      try {
        setExtraDataLoading(true);
        if (searchText.trim()) {
          const res = await fetch(
            config.getSearchedGif
              .replace('{query}', searchText.trim())
              .replace('{offset}', 0),
            {},
          );
          const updatedData = {...res, data: [...gifData?.data, ...res?.data]};
          setGifData(updatedData);
        } else {
          const res = await fetch(
            config.getTrendingApi.replace('{offset}', gifData?.data.length),
            {},
          );
          const updatedData = {...res, data: [...gifData?.data, ...res?.data]};
          setGifData(updatedData);
        }
        setExtraDataLoading(false);
      } catch (e) {
        setExtraDataLoading(false);
      }
    }
  };

  const _onSearch = async (text: string) => {
    try {
      setLoading(true);
      if (text.trim()) {
        const res = await fetch(
          config.getSearchedGif
            .replace('{query}', text.trim())
            .replace('{offset}', 0),
          {},
        );
        setGifData(res || {});
        setLoading(false);
      } else {
        fetchData();
      }
    } catch (e) {
      setGifData(null);
      setLoading(false);
    }
  };

  const debouncedSearch = useRef(debounce(_onSearch, 2000)).current;
  const debouncedLoad = debounce(_onLoadMore, 300);

  const onChangeText = (val: string) => {
    setSearchedText(val);
    debouncedSearch(val);
  };

  const _onGifPress = index => {
    if (index === selectedGif) {
      setSelectedGif(null);
      return;
    }
    setSelectedGif(index);
  };

  const saveToCameraRoll = (url: string) => {
    try {
      setShowDownloadModal(false);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Image is Saving...', ToastAndroid.SHORT);
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'gif',
        })
          .fetch('GET', url)
          .then(res => {
            console.log('console>> inside then');
            CameraRoll.save(res.path())
              .then(resp => {
                console.log('console>>', resp);
                ToastAndroid.show(
                  'Image saved Successfully.',
                  ToastAndroid.SHORT,
                );
              })
              .catch(error => {
                console.log('console>> ', error, 'error');
                ToastAndroid.show('Ops! Operation Failed', ToastAndroid.SHORT);
              });
          });
      } else {
        console.log('console>> inside else');
        CameraRoll.save(url).then(
          alert('Success', 'Photo added to camera roll!'),
        );
      }
    } catch (e) {
      console.log('console>> ', e, 'err in camera roll');
    }
  };

  const _onLongPress = (link: string) => {
    setDownloadGifLink(link);
    setShowDownloadModal(true);
  };

  const toggleModalOff = () => {
    setDownloadGifLink(null);
    setShowDownloadModal(false);
  };

  const _onDownloadPress = () => {
    if (downloadGifLink) {
      saveToCameraRoll(downloadGifLink);
    }
  };

  return {
    gifData,
    selectedGif,
    _onGifPress,
    isLoading,
    onChangeText,
    searchText,
    _onThemeToggle,
    theme,
    _onLoadMore: debouncedLoad,
    extraDataLoading,
    toggleModalOff,
    showDownloadModal,
    _onLongPress,
    _onDownloadPress,
  };
};
