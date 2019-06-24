import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    Image
} from "react-native";
import * as theme from '../theme';
import payments from '../assets/payments.json';
import Icon from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel';
import SliderEntry from "../components/SliderEntry";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import { ScrollView } from "react-native-gesture-handler";

const MyLoader = () => (
<SvgAnimatedLinearGradient
    height={100}>
    <Circle cx="20" cy="90" r="30" transform="rotate(-49.5, 32.5, 32.5)"/> 
    <Rect x="70" y="67" rx="0" ry="0" width="197" height="19" transform="rotate(-49.5, 32.5, 32.5)"/> 
    <Rect x="70" y="99" rx="0" ry="0" width="134" height="17" transform="rotate(-49.5, 32.5, 32.5)"/>
</SvgAnimatedLinearGradient>
  )

class Overview extends Component {
    mounted = false;
    constructor(props){
        super();
        this.state = {
          errors: [],
          transactions: []
        }
        this.props = props;
        this._carousel = {};
        this.init();
        // this.transactions = [];
        this.sum =0
        this.transactionState('Entertainment');
    }

    init(){
        this.state = {
          categories: [
            {
              id: "WpIAc9by5iU",
              title: "Transport",
              subtitle: "~$25.99 per month",
              image: require('../assets/images/transport_icon.jpg')
            }, {
              id: "sNPnbI1arSE",
              title: "Entertainment",
              subtitle: "~$32.49 per month",
              image: require('../assets/images/game_icon.jpg')
            }, {
              id: "VOgFZfRVaww",
              title: "Food",
              subtitle: "~$10.39 per month",
              image: require('../assets/images/food_icon.jpg')
            }, {
                id: "VOgXXfRVaww",
                title: "Bills",
                subtitle: "~$100.39 per month",
                image: require('../assets/images/bill_icon.jpg')
            }, {
                id: "VOgYYfRVaww",
                title: "Clothing",
                subtitle: "~$25.39 per month",
                image: require('../assets/images/clothes_icon.jpg')
              }
          ],
          transactions: []
        };
    
        console.log("ThumbnailCarousel Props: ", this.props)
      }

    _renderItem ({item, index}) {
        return (
            <SliderEntry data={item} />
        );
    }

    componentWillMount() {
        this.mounted = true;
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    transactionState(transaction_cat) {
        if (this.mounted) {
            this.setState({
                transactions: this.transactionData(transaction_cat)
            })
         }
    }

    transactionData(transaction_cat) {
        // console.log(payments)
        return payments[transaction_cat].map(tr => ( this.sum+=tr.amount,
                <View style={[styles.balance2, styles.shadow]} key={tr._id}>
                <Text h4 bold style={{     flex:2, justifyContent: 'center',    alignItems: 'center' }}>{tr.name}</Text> 
                <Text h4 bold style={{      flex:1, justifyContent: 'center',    alignItems: 'center'}}>{tr.amount.toString().startsWith('-') ? '-' + tr.amount.toString().replace('-', '$') : '$' + tr.amount}</Text>
                <Image
                style={{width: 50, height: 50, alignSelf: 'flex-end', position: 'absolute', top: 20, right: 20, borderRadius: 10}}
                source={{uri: tr.logo}}
                />
                </View>
        ))  
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1.2 }}>
                    <View style={styles.titleContain}>
                        <Text style={styles.subtitle}>Total spendings</Text>
                        <Text style={styles.title}>$259.49</Text>
                        <Text style={styles.microtitle}>$53.94 spent today</Text>
                    </View>
                </View>
                <View style={{ flex: 2}}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.categories}
                        renderItem={this._renderItem}
                        inactiveSlideShift={0}
                        inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        layout={'default'}
                        firstItem={1}
                        loop={true}
                        onSnapToItem={(index) => this.transactionState(this.state.categories[index].title) }
                    />
                </View>
                <View style={{ flex: 6.2}}>
                    <ScrollView style={{ flex: 1}}>
                        {this.state.transactions}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Overview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContain: {
        paddingLeft: 20,
        paddingTop: 20,
        flex: 1
    },
    cardContainer: {
        backgroundColor: 'grey', 
        height: 100, 
        borderRadius: 7 
    },
    title: {
        fontSize: theme.sizes.title,
        fontWeight: '800',
        color: theme.colors.gray,
    },
    subtitle: {
        fontSize: theme.sizes.subtitle,
        fontWeight: '700',
        color: theme.colors.gray,
    },
    subtitle_two: {
        fontSize: theme.sizes.subtitle_two,
        fontWeight: '600',
        color: theme.colors.gray,
    },
    microtitle: {
        fontSize: theme.sizes.microsub,
        fontWeight: '600',
        color: theme.colors.warn,
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    balanceCont2: {
        // position: 'absolute',
    
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0, left: 0, right: 0, bottom: 0,
        // backgroundColor: 'yellow',
        // flex: 5
        // height: 90,
      },
    balance2: {
        // flexDirection: 'column',
        // position: 'relative',
        borderRadius: theme.sizes.radius,
        paddingHorizontal: 15,
        paddingVertical: 30 / 2,
        // bottom: 0,
        // left: 0,
        top: 15,
        backgroundColor: theme.colors.white,
        height: 90,
        marginBottom: 10
      },
      shadow: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 0,
      },
});