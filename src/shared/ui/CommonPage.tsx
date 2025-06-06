// import styled from '@emotion/styled';
// import { JSX } from 'react';

// import { StreamsInfo, UserMeta, useUser } from '~/entities/user';

// import { Color } from '../theme/colors';

// type CommonPageProps = {
//   className?: string;
//   userQuery: string;
//   hasStreamInfo?: boolean;
//   title: string;
//   iconSrc: string;
//   action?: JSX.Element;
// };

// export function CommonPage({
//   className,
//   userQuery,
//   hasStreamInfo = false,
//   title,
//   iconSrc,
//   action,
// }: CommonPageProps): JSX.Element {
//   const { user } = useUser(userQuery);
//   const { user_level, image } = user;

//   return (
//     <StyledPageWrapper className={className}>
//       <StyledHeader>
//         <UserMeta
//           level={user_level}
//           photoSrc={image}
//           isShowInfo={hasStreamInfo}
//         />
//         {hasStreamInfo && <StreamsInfo userQuery={userQuery} />}
//       </StyledHeader>
//       <StyledTopSectionWrapper>
//         <StyledTitleWrapper>
//           <StyledIcon src={iconSrc} />
//           <StyledTitle>{title}</StyledTitle>
//         </StyledTitleWrapper>
//         {action}
//       </StyledTopSectionWrapper>
//       <StyledContentSectionWrapper>{children}</StyledContentSectionWrapper>
//       <Nabigation />
//     </StyledPageWrapper>
//   );
// }

// const StyledPageWrapper = styled.div``;

// const StyledHeader = styled.header``;

// const StyledTopSectionWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const StyledTitleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const StyledIcon = styled.img`
//   width: 24px;
//   height: 24px;
// `;

// const StyledTitle = styled.h1`
//   color: ${Color.Black_950};
//   font-size: 24px;
//   font-weight: bold;
// `;
