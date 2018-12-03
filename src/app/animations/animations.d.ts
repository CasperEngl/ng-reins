export interface IAddProductStart {
  backgroundColor: string;
  borderColor: string;
}

export interface IAddProductEnd {
  backgroundColor: string;
  borderColor: string;
}

export interface IAddProduct {
  easing: string;
  start: IAddProductStart;
  end: IAddProductEnd;
}

// ============================================================

export interface INavBackgroundStart {
  display: string;
  opacity: string;
}

export interface INavBackgroundEnd {
  display: string;
  opacity: string;
}

export interface INavBackground {
  easing: string;
  start: INavBackgroundStart;
  end: INavBackgroundEnd;
}

// ============================================================

export interface INavbarStart {
  transform: string;
  opacity: string;
}

export interface INavbarEnd {
  transform: string;
  opacity: string;
}

export interface INavbar {
  easing: string;
  start: INavbarStart;
  end: INavbarEnd;
}

// ============================================================

export interface IPageTransitionStart {
  display: string;
  opacity: string;
}

export interface IPageTransitionEnd {
  display: string;
  opacity: string;
}

export interface IPageTransition {
  easing: string;
  start: IPageTransitionStart;
  end: IPageTransitionEnd;
}