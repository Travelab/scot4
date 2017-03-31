import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import HeaderCommonInfo from '@molecules/HeaderCommonInfo'
import MobileMenuBtn from '@atoms/MobileMenuBtn'
import SearchBar from '@organisms/SearchBar'

import duck from './ducks'
import style from './style'

const cq = {
	t999: {
		maxWidth: 999
	}
}
const enhancer = createEnhancer({ cq, duck, style })
const cx = makeCX()

const Header = ({ $, l, state, actions, cq, ditch, ...props }) => {

	const { isSeachBarAcitvated, openSearchBar, closeSearchBar, children } = props
	const { isSideMenuOpened } = state
	const { openSideMenu, closeSideMenu } = actions
	const { t999 } = cq

	const renderMenuBtn = () => (
		<div className={$.mobileMenuBtnWrapper}>
			<MobileMenuBtn onClick={openSideMenu}/>
		</div>
	)

	const renderOverlay = () => (
		<div className={$.overlay} onClick={() => closeSideMenu() } />
	)

	const preventTouchMove = (e) => {
		if (t999 && isSideMenuOpened) e.preventDefault()
	}

	const propsSearchBar = {
		t999,
		isOpened: isSeachBarAcitvated,
		openSearchBar,
		closeSearchBar,
		ditch: ditch.getDitches().searchBar
	}

	const headerContainerClass = cx({
		[$.headerContainer]: !t999
	})
	const wrapperClass = cx({
		[$.wrapper]: !t999,
		[$.mobileWrapper]: t999
	})
	const commonInfoWrapperClass = cx({
		[$.commonInfoWrapper]: !t999,
		[$.mobileCommonInfoWrapper]: t999,
	})

	const containerClass = cx({
		[$.container]: true,
		[$.offsettedBySideMenu]: isSideMenuOpened && t999
	})

	return (
		<div className={containerClass} onTouchMove={preventTouchMove}>
			{(isSideMenuOpened && t999) ? renderOverlay() : null}
			<div className={headerContainerClass}>

				<div className={wrapperClass}>

					<div className={commonInfoWrapperClass}>
						<HeaderCommonInfo/>
					</div>

					{t999 ? renderMenuBtn() : null}

					<div className={$.childrenWrapper}>
						{t999 ? null : children}
					</div>
				</div>
			</div>
			{t999 ? children : null}
		</div>
	)
}

export default enhancer(Header)

