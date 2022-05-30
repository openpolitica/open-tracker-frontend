import { withOGImage } from 'next-api-og-image';
import { Bill } from 'components/OGImage';
import { clashDisplay, clashDisplayBold } from 'fonts/clash';
import { upperCaseFirstLetter } from 'utils/upperLowerCaseFirstLetter';
import formatDate from 'utils/formatDate';

const style = `
  @font-face {
    font-family: 'Clash Display';
    font-style:  normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${clashDisplay}) format('woff2');
  }

  @font-face {
    font-family: 'Clash Display';
    font-style:  normal;
    font-weight: bold;
    src: url(data:font/woff2;charset=utf-8;base64,${clashDisplayBold}) format('woff2');
  }
  `;

export default withOGImage({
  strategy: 'query', // Query strategy is the default one
  template: {
    react: async props => {
      const response = await fetch(`${process.env.api}bill/${props.billId}`);
      const data = await response.json();
      const bill = data.data;
      const presentationDate = bill.presentation_date;
      const authorInfo = bill.authorship.find(
        author => author.authorship_type === 'AUTOR',
      )?.congressperson;
      const authorName =
        authorInfo && `${authorInfo.id_name} ${authorInfo.id_first_surname}`;
      const authorImageUrl = authorInfo?.plenary.link_photo;

      return (
        <html>
          <head>
            <meta charSet="UTF-8" />
            <style dangerouslySetInnerHTML={{ __html: style }} />
          </head>
          <body style={{ width: '1200px', height: '630px', margin: '0pt' }}>
            <Bill
              title={upperCaseFirstLetter(bill.title)}
              authorName={authorName}
              authorImageUrl={authorImageUrl}
              presentationDate={formatDate(presentationDate)}
            />
          </body>
        </html>
      );
    },
  },
});
