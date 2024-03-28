import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  flx: {
    flex: 1,
  },
  gifContainer: {
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  txtInput: {
    width: '100%',
    height: 52,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: 200,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  btnColor: {
    color: 'black',
  },
});

export const colors = {
  light: {
    borderColor: 'black',
    background: 'white',
    buttonBackground: 'black',
    textPrimary: 'white',
    textSecondary: 'black',
  },
  dark: {
    borderColor: 'white',
    background: 'black',
    buttonBackground: 'white',
    textPrimary: 'black',
    textSecondary: 'white',
  },
};
