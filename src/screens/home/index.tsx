import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MasonryList from '@react-native-seoul/masonry-list';
import {useHomeHook} from './hooks';
import {colors, styles} from './styles';

const Home = () => {
  const {
    gifData,
    selectedGif,
    _onGifPress,
    isLoading,
    onChangeText,
    searchText,
    theme,
    _onThemeToggle,
    _onLoadMore,
    extraDataLoading,
    toggleModalOff,
    showDownloadModal,
    _onLongPress,
    _onDownloadPress,
  } = useHomeHook();

  const _renderGif = ({item}) => {
    const {images, id} = item || {};
    const isSelected = id === selectedGif;
    const onGifPress = () => {
      _onGifPress(id);
    };

    const onLongPress = () => {
      _onLongPress(images?.fixed_width_small?.url);
    };

    return (
      <Pressable
        onPress={onGifPress}
        onLongPress={onLongPress}
        style={[
          {
            width: Number(images?.fixed_width_small?.width),
            height: Number(images?.fixed_width_small?.height),
          },
          styles.gifContainer,
        ]}>
        <FastImage
          source={{
            uri: isSelected
              ? images?.fixed_width_small?.url
              : images?.fixed_width_small?.webp,
          }}
          style={{
            width: Number(images?.fixed_width_small?.width),
            height: Number(images?.fixed_width_small?.height),
          }}
        />
      </Pressable>
    );
  };

  const keyExtractor = item => item.id;

  const _emptyList = () => {
    return !isLoading ? (
      <Text
        style={{
          color: colors[theme].textSecondary,
        }}>{`No GIFs found for ${searchText}.`}</Text>
    ) : null;
  };

  const _listFooterComponent = () => {
    if (extraDataLoading) {
      return <ActivityIndicator size={'small'} color={'orange'} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.flx}>
      <View
        style={StyleSheet.flatten([
          styles.flx,
          styles.container,
          {backgroundColor: colors[theme].background},
        ])}>
        <Pressable
          onPress={_onThemeToggle}
          style={StyleSheet.flatten([
            styles.themeBtn,
            {backgroundColor: colors[theme].buttonBackground},
          ])}>
          <Text
            style={{
              color: colors[theme].textPrimary,
            }}>{`Toggle Theme - ${theme.toUpperCase()}`}</Text>
        </Pressable>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'black'}
          maxLength={20}
          onChangeText={onChangeText}
          value={searchText}
          style={styles.txtInput}
        />
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'orange'} />
        ) : (
          <MasonryList
            keyExtractor={keyExtractor}
            data={gifData?.data || []}
            extraData={[gifData]}
            renderItem={_renderGif}
            numColumns={3}
            ListEmptyComponent={_emptyList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            onEndReached={_onLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={_listFooterComponent}
          />
        )}
      </View>
      <Modal visible={showDownloadModal} transparent>
        <Pressable style={styles.modalContainer} onPress={toggleModalOff}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={_onDownloadPress}>
            <Text style={styles.btnColor}>Download</Text>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
