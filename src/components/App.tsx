import React, { FC } from "react";
import styled, { keyframes } from "styled-components/macro";
import { BookmarkList } from "./BookmarkList";
import { useOnMount } from "../hooks/useOnMount";
import { actions } from "../actions";
import { Header } from "./Header";
import { ReduxState } from "../types/ReduxState";
import { useMappedState } from "redux-react-hook";
import { useMappedActions } from "../hooks/useMappedActions";
import { getBookmarkTree } from "../selectors/getBookmarkTree";

const mapState = (state: ReduxState) => ({
  bookmarkTree: getBookmarkTree(state),
  areBookmarksReady: state.bookmarks.areBookmarksReady
});

const mapActions = {
  rehydrate: actions.rehydrate,
  retrieveBookmarks: actions.retrieveBookmarks
};

export const App: FC = () => {
  const { areBookmarksReady, bookmarkTree } = useMappedState(mapState);
  const { retrieveBookmarks, rehydrate } = useMappedActions(mapActions);

  useOnMount(() => {
    rehydrate();
    retrieveBookmarks();
  });

  return (
    <Root>
      {areBookmarksReady && (
        <>
          <Header />
          <Main>
            <BookmarkList bookmarkTree={bookmarkTree} />
          </Main>
        </>
      )}
    </Root>
  );
};

const fadeIn = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`;

const Root = styled.div`
  text-align: center;
  transition: all 0.6s ease-out;
  height: 100%;
  /* background: linear-gradient(to bottom, #d3959b, #bfe6ba); */
  background: linear-gradient(to bottom, #7474bf, #348ac7);
  background-attachment: fixed;
  min-height: 100vh;
`;

const Main = styled.main`
  animation: ${fadeIn} 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation-delay: 0.2s;
  padding: 0 40px;
`;
