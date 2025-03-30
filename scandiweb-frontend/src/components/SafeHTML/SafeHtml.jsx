import React, { Component } from 'react';
import sanitizeHtml from '../../functions/helpers/sanitizeHTML';

class SafeHtml extends Component {
  render() {
    const { htmlContent } = this.props;

    return (
      <div
        className="safe-html"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent) }}
        
      />
    );
  }
}

export default SafeHtml;