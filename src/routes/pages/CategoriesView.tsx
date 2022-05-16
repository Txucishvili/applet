import { BlockListContext } from "../../ui/components/BlockList/BlockListContext";
import BlockListRender from "../../ui/components/BlockList/BlockList";
import { SwitchComponent } from "@/utils/utils";
import { Suspense } from "react";

const TitlerComponent = ({ children }) => {
  return <div>{children}</div>
}

export enum BlockListSchema {
  BlockList = "BlockList"
}


const CategoriesViewMain = (props) => {
 
  return (
    <div className='container-outer'>
      <p>
        {/* Build Date: {dateTimeStamp}. */}
      </p>

      <BlockListContext.Provider>

        <SwitchComponent
          type="switch"
          schema={BlockListSchema}
          name="BlockListWrap"
          target="BlockList"
          component="BlockList">
          <BlockListRender key={BlockListSchema.BlockList}></BlockListRender>
        </SwitchComponent>

      </BlockListContext.Provider>
    </div>
  )
}

function CategoriesView() {


  return (
    <Suspense fallback="loading...">
      <CategoriesViewMain />
    </Suspense>
  )
};

// const Memo = memo(CategoriesView, () => true);

export default CategoriesView;