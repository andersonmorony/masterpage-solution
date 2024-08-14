import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import Header from '../components/Header';

import * as strings from 'MasterPageSolutionHeaderFooterApplicationCustomizerStrings';

const LOG_SOURCE: string = 'MasterPageSolutionHeaderFooterApplicationCustomizer';

export interface IMasterApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
  testMessage: string;
}

export interface IMasterPageSolutionHeaderFooterApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
  testMessage: string;
}

export default class MasterPageSolutionHeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IMasterPageSolutionHeaderFooterApplicationCustomizerProperties> {

    
  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

  private _renderPlaceHolders(): void {
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );
  
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
  
      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined.)";
        }
  
        if (this._topPlaceholder.domElement) {
          const element = React.createElement(Header, {
            topString: topString // Replace with your actual string
          });
        
          ReactDOM.render(element, this._topPlaceholder.domElement);
        }
      }
    }
  
    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }
  
      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined.)";
        }
  
        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="">
            <div class="">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                bottomString
              )}
            </div>
          </div>`;
        }
      }
    }
  }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }
}
