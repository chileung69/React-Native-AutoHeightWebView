'use strict'
import React, { Component } from 'react';
import {WebView} from "react-native";

const rawHtml="<html><head></head><body><p>Hello <a href='http://flexwork.io'>flexwork.io</a></p></body></html>";
const script = `
<script>
	window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
	document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
</script>
`;
const style = `
<style>
body, html, #height-calculator {
    margin: 0;
    padding: 0;
}
#height-calculator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
`;
class AutoHeightWebView extends Component
{
	constructor(props) {
        super(props);

        this.state = {
           Height:0
        };
    }
    onNavigationChange(event) {
        if (event.title) {
            const htmlHeight = Number(event.title) //convert to number
            this.setState({Height:htmlHeight});
        }
				if(event.url)
					this.props.urlChangeCallBack(event.url);
     }
		onStartLoad(event) {
			if(event.url)
				return this.props.urlChangeCallBack(event.url);
			return true;
		}
		onLoadStart(event) {
			if(event.url)
				return this.props.onLoadStart(event.url);
		}
    render () {
    	return (
    	// 	<WebView scrollEnabled={true}
      //           source={{uri: 'https://mall.openvrshop.com/?app=true&platform=ios&v=1.0'}}
      //           style={{height:this.state.Height}}
      // 			javaScriptEnabled ={true}
      // 			onNavigationStateChange={this.onNavigationChange.bind(this)}>
			// </WebView>
			<WebView scrollEnabled={true}
							source = {{uri: this.props.targetUrl}}
							style = {{height:this.state.Height}}
					javaScriptEnabled = {true}
					allowsInlineMediaPlayback = {true}
					dataDetectorTypes = 'all'
					onShouldStartLoadWithRequest = {this.onStartLoad.bind(this)}
					onLoadStart = {this.onLoadStart.bind(this)}
					onNavigationStateChange = {this.onNavigationChange.bind(this)}>
			</WebView>
    		)
    }

}
export default AutoHeightWebView;
