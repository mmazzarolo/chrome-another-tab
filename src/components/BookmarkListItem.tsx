import React, {
  FC,
  memo,
  MouseEvent,
  useCallback,
  useRef,
  useState
} from "react";
import { useMappedState } from "redux-react-hook";
import styled, { keyframes } from "styled-components/macro";
import { Hide as HideIcon } from "styled-icons/boxicons-regular";
import { Show as ShowIcon } from "styled-icons/boxicons-regular";
import { FolderOpen as FolderIcon } from "styled-icons/fa-solid/FolderOpen";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "../selectors/getIsBookmarkHidden";
import { useMappedActions } from "../hooks/useMappedActions";
import { delay } from "../utils/delay";

interface Props {
  id: string;
  title: string;
  url?: string;
}

const mapActions = {
  hideBookmark: actions.hideBookmark,
  showBookmark: actions.showBookmark
};

export const BookmarkListItem: FC<Props> = memo(props => {
  const { title, url, id } = props;

  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsBookmarkHidden(state, id)
    }),
    [id]
  );
  const { isHidden } = useMappedState(mapState);
  const { hideBookmark, showBookmark } = useMappedActions(mapActions);

  const handleHideClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isHidden) {
      showBookmark(id);
    } else {
      hideBookmark(id);
    }
  };

  const faviconSrc = url && getFaviconUrl(url);

  // To improve the performance we render the <Options> DOM node on a mouseOver
  // event and we hide it on a mouseOut event (delaying it by a few ms to make
  // sure the exit animation is completed).
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const shouldStopOptionsHiding = useRef(false);
  const handleMouseOver = () => {
    setAreOptionsVisible(true);
    shouldStopOptionsHiding.current = true;
  };
  const handleMouseOut = async () => {
    shouldStopOptionsHiding.current = false;
    await delay(200);
    if (!shouldStopOptionsHiding.current) {
      setAreOptionsVisible(false);
    }
  };

  return (
    <Root
      href={url}
      rel="noopener noreferrer"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Content isHidden={isHidden}>
        {url && <Favicon src={faviconSrc} />}
        {!url && <StyledFolderIcon />}
        <Title>{title}</Title>
      </Content>
      {areOptionsVisible && (
        <Options>
          <Option onClick={handleHideClick}>
            {!isHidden && <StyledHideIcon />}
            {isHidden && <StyledShowIcon />}
          </Option>
        </Options>
      )}
    </Root>
  );
});

const scaleIn = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Root = styled.a`
  display: flex;
  flex-direction: row;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  width: 320px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease-out;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  opacity: ${(props: { isHidden: boolean }) => (props.isHidden ? "0.4" : "1")};
`;

const Favicon = styled.img`
  height: 24px;
  width: 24px;
  min-width: 24px;
  margin-right: 12px;
`;

const StyledFolderIcon = styled(FolderIcon)`
  color: white;
  height: 24px;
  width: 24px;
  margin-right: 12px;
`;

const Title = styled.span`
  letter-spacing: 0px;
  font-weight: 500;
  color: white;

  ${Root}:hover & {
    color: #7076c0;
  }
`;

const Options = styled.div`
  position: absolute;
  margin-top: -8px;
  margin-left: 300px;
  width: 40px;
  height: 40px;
  display: none;

  ${Root}:hover & {
    display: block;
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  animation: ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 140ms;
  transition: background-color 100ms;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const StyledHideIcon = styled(HideIcon)`
  color: #7076c0;
  height: 24px;
  width: 24px;
`;

const StyledShowIcon = styled(ShowIcon)`
  color: #7076c0;
  height: 24px;
  width: 24px;
`;
