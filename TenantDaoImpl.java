package cn.com.hszl.biz.impl.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import cn.com.hszl.base.ADPAbstractBaseDaoImpl;
import cn.com.hszl.biz.ds.form.TenantForm;

@Component
public class TenantDaoImpl extends ADPAbstractBaseDaoImpl<TenantForm, Integer>{
    private static Logger logger = LoggerFactory.getLogger(TenantDaoImpl.class);
    private static String nameSpace = TenantForm.class.getName();

	@Override
	protected Logger getLogger() {
		// TODO Auto-generated method stub
		return logger;
	}

	@Override
	protected String getNameSpace() {
		// TODO Auto-generated method stub
		return nameSpace;
	}

}
