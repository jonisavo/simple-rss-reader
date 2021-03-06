import React from 'react';
import { Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import * as WebBrowser from 'expo-web-browser';
import type { Props } from './NavigationTypes';

import ArticleHeader from '../components/ArticleHeader';

export default function ArticlePage({ navigation, route }: Props): JSX.Element {
  const { article } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ArticleHeader article={article} />,
    });
  }, [article, navigation]);

  const content = article.content ? article.content : article.description;

  const openLink = async url => WebBrowser.openBrowserAsync(url);

  const openArticleLink = async () => {
    if (article.links[0]?.url) {
      await openLink(article.links[0].url);
    }
  };

  const htmlElement = (
    <HTML
      source={{ html: content }}
      containerStyle={styles.htmlContainer}
      baseFontStyle={styles.htmlText}
      onLinkPress={(event, href, htmlAttribs) => openLink(href)}
      tagsStyles={{
        a: { color: '#FFAA00' },
        code: { fontFamily: 'CourierPrime' },
        pre: { fontFamily: 'CourierPrime' },
        img: { maxWidth: Dimensions.get('window').width - 80 },
      }}
      alterData={node => {
        const { parent, data } = node;
        if (parent && parent.name === 'p') {
          return data.split('\n').join(' ');
        }
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {!!content && htmlElement}
        <TouchableOpacity onPress={openArticleLink} style={styles.linkButton}>
          <Text>Open in browser</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  htmlContainer: {
    flex: 1,
    backgroundColor: '#23002D',
    marginVertical: 10,
    marginHorizontal: 20,
    borderStyle: 'solid',
    borderColor: '#EEE',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    maxWidth: Dimensions.get('window').width - 50,
  },
  htmlText: {
    fontSize: 17,
    color: '#EEE',
    fontFamily: 'SourceSansPro',
  },
  linkButton: {
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 25,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFAA00',
    color: '#23002D',
  },
});
